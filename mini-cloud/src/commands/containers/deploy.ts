import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Deploy extends Command {
  static description = 'Deploy a container from a pre-built Docker image';

  static flags = {
    name: Flags.string({ char: 'n', description: 'Container name', required: true }),
    image: Flags.string({ char: 'i', description: 'Docker image', required: true }),
    env: Flags.string({ char: 'e', description: 'Environment variables', multiple: true }),
    cpu: Flags.integer({ char: 'c', description: 'CPU shares' }),
    memory: Flags.integer({ char: 'm', description: 'Memory limit' }),
  };

  async run() {
    const { flags } = await this.parse(Deploy);

    try {
      const response = await axios.post('http://localhost:4000/api/containers/deploy', {
        name: flags.name,
        image: flags.image,
        env: flags.env,
        cpu: flags.cpu,
        memory: flags.memory,
      });
      this.log(`Deployed container ${response.data.Id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error(`Failed to deploy container: ${error.message}`);
      } else if (error instanceof Error) {
        this.error(`Failed to deploy container: ${error.message}`);
      } else {
        this.error('An unknown error occurred');
      }
    }
  }
}
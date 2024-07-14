import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Create extends Command {
  static description = 'Create a new container';

  static flags = {
    name: Flags.string({ char: 'n', description: 'Container name', required: true }),
    image: Flags.string({ char: 'i', description: 'Docker image', required: true }),
    env: Flags.string({ char: 'e', description: 'Environment variables', multiple: true }),
    cpu: Flags.integer({ char: 'c', description: 'CPU shares' }),
    memory: Flags.integer({ char: 'm', description: 'Memory limit' }),
  };

  async run() {
    const { flags } = await this.parse(Create);

    try {
      const response = await axios.post('http://localhost:4000/api/containers', {
        name: flags.name,
        image: flags.image,
        env: flags.env,
        cpu: flags.cpu,
        memory: flags.memory,
      });
      this.log(`Created container ${response.data.Id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        this.error(`Failed to create container: ${error.message}`);
      } else if (error instanceof Error) {
        // Handle generic errors
        this.error(`Failed to create container: ${error.message}`);
      } else {
        // Handle unexpected errors
        this.error('An unknown error occurred');
      }
    }
  }
}
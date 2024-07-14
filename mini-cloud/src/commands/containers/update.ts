import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Update extends Command {
  static description = 'Update a container';

  static flags = {
    id: Flags.string({ char: 'i', description: 'Container ID', required: true }),
    env: Flags.string({ char: 'e', description: 'Environment variables', multiple: true }),
    cpu: Flags.integer({ char: 'c', description: 'CPU shares' }),
    memory: Flags.integer({ char: 'm', description: 'Memory limit' }),
  };

  async run() {
    const { flags } = await this.parse(Update);

    try {
      const response = await axios.put(`http://localhost:4000/api/containers/${flags.id}`, {
        env: flags.env,
        cpu: flags.cpu,
        memory: flags.memory,
      });
      this.log(`Updated container ${flags.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        this.error(`Failed to update container: ${error.message}`);
      } else if (error instanceof Error) {
        // Handle generic errors
        this.error(`Failed to update container: ${error.message}`);
      } else {
        // Handle unexpected errors
        this.error('An unknown error occurred');
      }
    }
  }
}
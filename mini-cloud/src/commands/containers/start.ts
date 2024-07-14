import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Start extends Command {
  static description = 'Start a container';

  static flags = {
    id: Flags.string({ char: 'i', description: 'Container ID', required: true }),
  };

  async run() {
    const { flags } = await this.parse(Start);

    try {
      await axios.post(`http://localhost:4000/api/containers/${flags.id}/start`);
      this.log(`Started container ${flags.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        this.error(`Failed to start container: ${error.message}`);
      } else if (error instanceof Error) {
        // Handle generic errors
        this.error(`Failed to start container: ${error.message}`);
      } else {
        // Handle unexpected errors
        this.error('An unknown error occurred');
      }
    }
  }
}
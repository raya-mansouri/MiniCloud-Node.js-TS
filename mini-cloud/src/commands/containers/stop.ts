import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Stop extends Command {
  static description = 'Stop a container';

  static flags = {
    id: Flags.string({ char: 'i', description: 'Container ID', required: true }),
  };

  async run() {
    const { flags } = await this.parse(Stop);

    try {
      await axios.post(`http://localhost:4000/api/containers/${flags.id}/stop`);
      this.log(`Stopped container ${flags.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        this.error(`Failed to stop container: ${error.message}`);
      } else if (error instanceof Error) {
        // Handle generic errors
        this.error(`Failed to stop container: ${error.message}`);
      } else {
        // Handle unexpected errors
        this.error('An unknown error occurred');
      }
    }
  }
}
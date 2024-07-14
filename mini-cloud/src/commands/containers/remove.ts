import { Command, Flags } from '@oclif/core';
import axios from 'axios';

export default class Remove extends Command {
  static description = 'Remove a container';

  static flags = {
    id: Flags.string({ char: 'i', description: 'Container ID', required: true }),
  };

  async run() {
    const { flags } = await this.parse(Remove);

    try {
      await axios.delete(`http://localhost:4000/api/containers/${flags.id}`);
      this.log(`Removed container ${flags.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        this.error(`Failed to remove container: ${error.message}`);
      } else if (error instanceof Error) {
        // Handle generic errors
        this.error(`Failed to remove container: ${error.message}`);
      } else {
        // Handle unexpected errors
        this.error('An unknown error occurred');
      }
    }
  }
}
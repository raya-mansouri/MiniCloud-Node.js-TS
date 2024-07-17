// server/src/controllers/containers.ts
import { Request, Response } from 'express';
import Docker from 'dockerode';
const docker = new Docker({ host: '127.0.0.1', port: 2375 });

// Function to create and start a container from a pre-built Docker image
export const deployContainer = async (req: Request, res: Response) => {
  const { image, name, env, cpu, memory } = req.body;

  try {
    // Pull the Docker image if it doesn't exist locally
    await new Promise<void>((resolve, reject) => {
      docker.pull(image, (err: Error | null, stream: NodeJS.ReadableStream) => {
        if (err) {
          return reject(err);
        }
        docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(error: Error | null) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }

        function onProgress(event: any) {
          console.log(event);
        }
      });
    });

    // Create the container
    const container = await docker.createContainer({
      Image: image,
      name: name,
      Env: env,
      HostConfig: {
        CpuShares: cpu,
        Memory: memory,
      },
    });

    // Start the container
    await container.start();

    // Respond with the container ID
    res.status(201).json({ Id: container.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Function to get a list of containers
export const listContainers = async (req: Request, res: Response) => {
  try {
    // Fetch all containers, including stopped ones
    const containers = await docker.listContainers({ all: true });

    // Respond with the list of containers
    res.status(200).json(containers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const createContainer = async (req: Request, res: Response) => {
  const { image, name, env, cpu, memory } = req.body;
  try {
    const container = await docker.createContainer({
      Image: image,
      name: name,
      Env: env,
      HostConfig: {
        CpuShares: cpu,
        Memory: memory,
      },
    });
    res.status(201).json(container);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const startContainer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const container = docker.getContainer(id);
    await container.start();
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const stopContainer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const container = docker.getContainer(id);
    await container.stop();
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const removeContainer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const container = docker.getContainer(id);
    await container.remove();
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const updateContainer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const container = docker.getContainer(id);
    await container.update(updates);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
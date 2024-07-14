// server/src/controllers/containers.ts
import { Request, Response } from 'express';
import Docker from 'dockerode';
const docker = new Docker({ host: '127.0.0.1', port: 2375 });

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
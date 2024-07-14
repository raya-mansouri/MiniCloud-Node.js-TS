# MiniCloud-Node.js-TS

Description

The Mini Cloud PaaS Service is designed to provide a simplified platform for deploying and managing containerized applications. This project will be developed in two phases, each adding a set of essential features to the platform.
Phase 1 Requirements:

    Deploying Docker Images Directly
        The platform should allow users to deploy pre-built Docker images.
    Single Node Operation
        The initial implementation should be designed to run on a single node to simplify deployment and management.
    Resource Limitation
        Limit the RAM and CPU allocated to each container to prevent resource exhaustion.
        Ensure that these limits can be specified during container creation and adjusted later.
    Container Management
        Provide functionality to create, update, and delete containers.
        Enable setting environment variables for containers during creation and updates.
        Allow turning containers on and off without deleting them.
    Volume Management
        Allow users to attach volumes to containers for persistent storage.
        Ensure that the volumes can be managed independently from the containers.
    Resource Monitoring
        Implement monitoring for RAM, CPU, and disk usage.
    Logging
        Provide access to container logs for troubleshooting and monitoring purposes.
    CLI Development
        Develop a command-line interface (CLI) using the Oclif framework.
        The CLI should allow users to perform all the tasks mentioned above (deploying images, managing containers, monitoring, etc.).

‌
Tech Stack:

    NodeJS
    TypeScript
    MongoDB
    Docker
    Docker Compose
    Logging: Fluentd and Loki
    Monitoring: Prometheus and Grafana


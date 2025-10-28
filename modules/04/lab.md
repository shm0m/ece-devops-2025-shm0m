#  DevOps Labs Report – Docker, Redis & Vagrant

---

##  Lab – Containers with Docker

###  Main purpose of the lab
Understand the basics of containerization using Docker:
- Write a `Dockerfile` for a Node.js app
- Build and run Docker images
- Use port mapping and volumes
- Push images to Docker Hub

###  Possible application in a company
Docker is heavily used in companies to:
- Deploy microservices quickly and consistently  
- Reproduce environments for dev, test, and prod  
- Simplify CI/CD pipelines with portable containers

###  Step in the DevOps cycle
**Step:** *Build & Deploy*  
Docker ensures the application is built in a reproducible way and deployed identically on every environment.

###  Problems encountered
| Problem | Cause | Solution |
|----------|--------|-----------|
| Docker engine error (`file not found`) | Docker Desktop not started | Launched Docker Desktop manually |
| `npm ERR! missing script: start` | Missing `"start"` script in package.json | Added `"start": "node index.js"` |
| `Cannot find module 'node:events'` | Node 12 incompatible with Express 5 | Updated `FROM node:12` → `FROM node:20` |
| Volume not mounting | PowerShell doesn’t support `$(pwd)` | Used `${PWD}` or full Windows path |

###  Final state
All objectives achieved   
The app ran successfully on `localhost`, volumes worked, and image pushed to Docker Hub.  
→ Lab validated.

---

## Lab – Redis with Docker Compose

###  Main purpose of the lab
Understand how to use **Docker Compose** to manage multi-container applications:
- Node.js app connected to Redis
- Define services, volumes, and dependencies in `docker-compose.yaml`

###  Possible application in a company
Docker Compose simplifies the orchestration of multi-service systems (e.g., app + database + cache).  
It’s often used for:
- Local development environments  
- CI testing with multiple services  
- Microservices prototyping  

###  Step in the DevOps cycle
**Step:** *Build / Test / Deploy*  
Compose helps automate environment setup for integration testing and deployments.

###  Problems encountered
| Problem | Cause | Solution |
|----------|--------|-----------|
| Counter reset on container restart | Redis data not persisted | Added a named volume (`redis-data:/data`) in docker-compose |
| Connection refused | Redis not ready before Node.js starts | Used `depends_on: redis` in docker-compose |

###  Final state
The Node.js + Redis app worked correctly.  
Counter persisted across container restarts using Docker Volumes.  
→ Lab objectives achieved successfully.

---

##  Lab – Virtual Machines with Vagrant

###  Main purpose of the lab
Learn how to automate VM provisioning with **Vagrant**:
- Initialize a VM (`vagrant init`)
- Configure a `Vagrantfile`
- Start (`vagrant up`) and connect via SSH

###  Possible application in a company
Vagrant allows reproducible **development environments** on any OS.  
It’s used by dev teams to standardize local environments and test infrastructure code before deployment.

###  Step in the DevOps cycle
**Step:** *Plan & Build*  
Vagrant is part of the infrastructure provisioning stage — setting up environments before deployment or testing.

###  Problems encountered
| Problem | Cause | Solution |
|----------|--------|-----------|
| Vagrant didn’t start due to WSL conflict | Docker Desktop uses WSL2 backend, conflicting with VirtualBox/Vagrant | Tried switching to Hyper-V but system incompatible |
| VM launch failed | Missing provider configuration | Attempted manual `vagrant up` fix but WSL kept overriding |

###  How it was handled
- Analyzed error logs related to Vagrant + WSL conflict  
- Checked [HashiCorp docs](https://developer.hashicorp.com/vagrant/docs) and [Windows WSL issues](https://learn.microsoft.com/en-us/windows/wsl/)  
- Decided to skip VM provisioning and document the issue clearly  

### Final state
**Lab not completed** due to WSL and virtualization conflicts.  
Docker Desktop on Windows uses WSL2, which blocks VirtualBox (needed for Vagrant).  
→ Lab analyzed and documented but not executed.

---

## 🏁 Global Conclusion
- **Docker**: Successfully containerized a Node.js app  
- **Redis Compose**: Managed multi-container orchestration and data persistence  
- **Vagrant**: Understood conceptually, blocked by WSL conflict  

Overall, these labs strengthened understanding of **DevOps automation**, **environment reproducibility**, and **infrastructure as code** concepts.

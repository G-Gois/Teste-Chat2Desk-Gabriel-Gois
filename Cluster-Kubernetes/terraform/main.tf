provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "master" {
  image  = "docker-18-04"
  name   = "master"
  region = "nyc3"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    var.ssh_fingerprint
  ]
}

resource "digitalocean_droplet" "worker" {
  count  = var.worker_nodes
  image  = "docker-18-04"
  name   = "worker-${count.index}"
  region = "nyc3"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    var.ssh_fingerprint
  ]
}
resource "digitalocean_droplet" "node" {
  image  = "docker-20-04"
  name   = "node-${count.index}"
  region = "nyc3"
  size   = "s-2vcpu-2gb"  // Changed from "s-1vcpu-1gb" to "s-2vcpu-2gb"
  count  = 3
  ssh_keys = [
    var.ssh_fingerprint
  ]
  provisioner "remote-exec" {
    script = "initial-setup.sh"
  }
}
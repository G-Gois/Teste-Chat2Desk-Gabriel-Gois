#!/bin/bash

# Variáveis de ambiente
KUBECONFIG_PATH="/path/to/your/kubeconfig"
K8S_NAMESPACE="your-namespace"
DEPLOYMENT_NAME="your-deployment"
IMAGE_NAME="your-image-name"
IMAGE_TAG="your-image-tag"

# Configuração do kubectl
export KUBECONFIG=$KUBECONFIG_PATH

# Implantação do microserviço
echo "Aplicando a atualização do deployment..."
kubectl -n $K8S_NAMESPACE set image deployment/$DEPLOYMENT_NAME $DEPLOYMENT_NAME=$IMAGE_NAME:$IMAGE_TAG

echo "Aguardando a implantação estar disponível..."
kubectl -n $K8S_NAMESPACE rollout status deployment/$DEPLOYMENT_NAME

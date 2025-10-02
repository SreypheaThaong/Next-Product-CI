pipeline {
    agent {
      kubernetes {
        yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: docker
      image: docker:24.0.5
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-socket
          mountPath: /var/run/docker.sock
        - name: workspace-volume
          mountPath: /workspace
    - name: git
      image: alpine/git
      command:
        - cat
      tty: true
      workingDir: /workspace
      volumeMounts:
        - name: workspace-volume
          mountPath: /workspace

  volumes:
    - name: workspace-volume
      emptyDir: {}
    - name: docker-socket
      hostPath:
        path: /var/run/docker.sock
"""
      }
    }
    environment {
      IMAGE_TAG = "${bUILD_NUMBER}"
      DOCKER_IMAGE = "nextjs-app"
      GIT_REPO = "https://github.com/Solen-s/frontend-manifest.git"
    }
    stages {
         // Build image and push to DockerHub
    stage('Build Docker Image') {
      steps {
        container('docker') {
            script {
                withCredentials([usernamePassword(credentialsId: 'docker-token', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                   try {
                    // Build image
                    sh "docker build -t ${env.DOCKER_IMAGE}:${env.IMAGE_TAG} ."
                    echo '✅ Docker image: ${env.DOCKER_IMAGE} built successfully.'
                    // Login to DockerHub
                    sh 'echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'
                    echo '✅ Docker login to "$DOCKERHUB_USERNAME" successfully.'
                    // Tag of image
                    sh "docker tag ${env.DOCKER_IMAGE}:${env.IMAGE_TAG} ${DOCKERHUB_USERNAME}/${env.DOCKER_IMAGE}:${env.IMAGE_TAG}"
                    // Push image to Dockerhub
                    sh "docker push ${DOCKERHUB_USERNAME}/${env.DOCKER_IMAGE}:${env.IMAGE_TAG}"
                    echo "✅ Push image: ${env.DOCKER_IMAGE}:${env.IMAGE_TAG} to DockerHub successfully."
                } catch (err) {
                    error "❌ Pipeline failed: ${err.getMessage()}"
                }
                }
            }
        }
      }
    }

    // This ArgoCD stage
    stage('Update helm chart and deploy to Kubernetes') {
      steps {
        container('git') {
          script {
            withCredentials([usernamePassword(credentialsId: 'git_token', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
              try{
                sh "rm -rf nextjs-manifest || true"
                // Clone the repository
                sh 'git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@{GIT_REPO} nextjs-manifest'
                sh """
                cd nextjs-manifest
                sed -i 's|tag: .*|tag: "${IMAGE_TAG}"|' values.yaml
                git add values.yaml
                git commit -m "Update application tag to ${IMAGE_TAG}"
                git push origin main
                """
              }catch (err) {
                error "❌ Pipeline failed: ${err.getMessage()}"
              }
            }
          }
        }
      }
    }
  }
}
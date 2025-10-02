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
                    sh "docker build -t {.env.DOCKER_IMAGE}:${env.IMAGE_TAG} ."
                    echo '✅ Docker image: ${env.DOCKER_IMAGE} built successfully.'
                    // Login
                    sh 'echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'
                    echo '✅ Docker login to "$DOCKERHUB_USERNAME" successful.'
                    // Tag image
                    sh "docker tag ${env.DOCKER_IMAGE}:${env.IMAGE_TAG} ${DOCKER_USERNAME}/${env.DOCKER_IMAGE}:${env.IMAGE_TAG}"
                    // Push
                    sh "docker push "$DOCKERHUB_USERNAME"/${env.DOCKER_IMAGE}:${env.IMAGE_TAG}"
                    echo '✅ Push image: "$DOCKERHUB_USERNAME"/${env.DOCKER_IMAGE}:${env.IMAGE_TAG} to DockerHub successfully.'
                } catch (err) {
                    error "❌ Pipeline failed: ${err.getMessage()}"
                }
                }
            }
        }
      }
    }
  }
}
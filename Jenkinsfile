pipeline {
    agent {
      kubernetes {
        yamlFile """
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
                    sh "docker build -t my-nextjs-app:${env.IMAGE_TAG} ."
                    echo '✅ Docker image built successfully.'
                    // Login
                    sh 'docker login -u ${DOCKER_USERNAME} --password-stdin'
                    echo '✅ Docker login successful.'
                    // Tag image
                    sh "docker tag my-nextjs-app:${env.IMAGE_TAG} ${env.REGISTRY}/nextjs-app:${env.IMAGE_TAG}"
                    // Push
                    sh "docker push ${env.REGISTRY}/nextjs-app:${env.IMAGE_TAG}"
                    echo '✅ Push image to DockerHub successfully.'
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
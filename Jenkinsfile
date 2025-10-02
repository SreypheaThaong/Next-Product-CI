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
    volumes:
      - name: workspace-volume
        emptyDir: {}
      - name:docker-socket
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
                        if(  sh 'docker build -t my-nextjs-app:${}.') | true {
                          echo '✅ Docker image built successfully.'
                        } else {
                          echo '❌ Docker image build failed.'
                        }
                        if ( sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD' ) {
                          echo '✅ Docker login successful.'
                        } else {
                          error '❌ Docker login failed.'
                        }
                        sh 'docker tag nextjs-app:${IMAGE_TAG} $REGISTRY/nextjs-app:${IMAGE_TAG}'
                        if ( sh'docker push $REGISTRY/nextjs-app:${IMAGE_TAG}' ) {
                          echo '✅ Push image to DockerHub successfully.'
                        } else {
                          error '❌ Push image to DockerHub failed.'
                        }
                    }
                }
            }
        }

    }
}
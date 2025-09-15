pipeline {
    agent any

    stages {

         // Build image
        stage('Build Docker Image') {
            steps {
                sh "
                docker build \
                  --build-arg NEXT_PUBLIC_AUTH_BASE_URL=http://spring:9090 \
                  -t nextjs-app:${BUILD_NUMBER} ."
            }
        }

        stage('Run Container') {
            steps {
                sh """
                  # Stop & remove old container if it exists
                if [ \$(docker ps -aq -f name=nextjs-app-con) ]; then
                  docker rm -f nextjs-app-con
                fi

                # Run NextJs container
                docker run -d --name nextjs-app-con -p 3000:3000 nextjs-app:${BUILD_NUMBER}
                """
            }
        }
    }
}
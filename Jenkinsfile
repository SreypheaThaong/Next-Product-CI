pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-token')
        IMAGE = "phea12/next-homework-image"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build Next.js') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root:root'
                }
            }
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE:${BUILD_NUMBER} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    if (sh(script: 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin', returnStatus: true) == 0) {
                        sh "docker push $IMAGE:${BUILD_NUMBER}"
                    } else {
                        error("Docker login failed")
                    }
                }
            }
        }
    }
}

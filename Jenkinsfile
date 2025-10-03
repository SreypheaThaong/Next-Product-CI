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
                        echo "✅ Docker login success"
                        sh "docker push $IMAGE:${BUILD_NUMBER}"
                    } else {
                        error("❌ Docker login failed")
                    }
                }
            }
        }

        stage('Update Helm Repo for CD') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-token', 
                                                      usernameVariable: 'GIT_USER', 
                                                      passwordVariable: 'GIT_PASS')]) {
                        sh '''
                            rm -rf CD-next-service
                            git clone https://$GIT_USER:$GIT_PASS@github.com/SreypheaThaong/Next-Product-CD
                            cd Next-Product-CD/next
                            
                            # update values.yaml with new image tag
                            sed -i "s|tag:.*|tag: \\"${BUILD_NUMBER}\\"|" values.yaml
                            
                            git config user.email "thaong.sreyphea17@gmail.com"
                            git config user.name "SreypheaThaong"
                            git add values.yaml
                            git commit -m "Update Next.js image tag to ${BUILD_NUMBER}"
                            git push origin main
                        '''
                    }
                }
            }
        }
    }
}

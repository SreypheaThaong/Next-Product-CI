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
                    try {
                        if (sh(script: 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin', returnStatus: true) == 0) {
                            echo "Docker login successful."

                            if (sh(script: "docker push $IMAGE:${BUILD_NUMBER}", returnStatus: true) == 0) {
                                echo "Docker image pushed successfully."
                            } else {
                                error("Docker push failed.")
                            }

                        } else {
                            error("Docker login failed.")
                        }
                    } catch (err) {
                        error("Error during Docker push: ${err}")
                    }
                }
            }
        }

        // stage('Update Helm Repo') {
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'github-token',
        //                                               usernameVariable: 'GIT_USER',
        //                                               passwordVariable: 'GIT_PASS')]) {
        //                 sh '''
        //                     rm -rf CD-product-service
        //                     git clone https://$GIT_USER:$GIT_PASS@github.com/SreypheaThaong/CD-product-service.git
        //                     cd CD-product-service
        //                     # update Next.js image tag in values.yaml
        //                     sed -i "s|tag:.*|tag: \\"${BUILD_NUMBER}\\"|" values.yaml
        //                     git config user.email "thaong.sreyphea17@gmail.com"
        //                     git config user.name "SreypheaThaong"
        //                     git commit -am "Update Next.js image tag to ${BUILD_NUMBER}"
        //                     git push origin main
        //                 '''
        //             }
        //         }
        //     }
        // }
    }
}

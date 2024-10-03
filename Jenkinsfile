pipeline {
    agent any

    environment {
        APP_NAME = 'SeyCodes' // Replace with your application name
        EC2_USER = 'ubuntu' // Replace with your EC2 username (e.g., ec2-user, ubuntu)
        EC2_HOST = '3.25.187.71' // Replace with your EC2 instance IP or hostname
        DEPLOY_SSH_CREDENTIALS = 'ec2Key' // The ID for EC2 deployment SSH credentials
        GIT_SSH_CREDENTIALS = 'github-token' // The ID for GitHub SSH credentials
        REPO_URL = 'https://github.com/omarseyam1729/SeyCodes.git' 
        BRANCH = 'main' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps{
                sh 'npm run lint'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ["${env.DEPLOY_SSH_CREDENTIALS}"]) {
                    // Ensure the directory exists on EC2
                    sh """
                        ssh ${env.EC2_USER}@${env.EC2_HOST} 'mkdir -p /home/${env.EC2_USER}/${env.APP_NAME}'
                    """

                    // Transfer all project files to the EC2 instance
                    sh """
                        rsync -avz --delete --exclude='node_modules' --exclude='.git' ./ ${env.EC2_USER}@${env.EC2_HOST}:/home/${env.EC2_USER}/${env.APP_NAME}/
                    """

                    // Ensure you're in the correct directory and install production dependencies
                    sh """
                        ssh ${env.EC2_USER}@${env.EC2_HOST} << 'ENDSSH'
                            cd /home/${env.EC2_USER}/${env.APP_NAME}/
                            npm install --omit=dev  # Omit devDependencies for production
                            pm2 reload ecosystem.config.js --env production
ENDSSH
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
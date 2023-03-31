pipeline {
    agent any

    stages {
        stage('Fetch code') {
            steps {
                git branch: 'main', url: 'https://github.com/rafael556/devops-stock-management-api.git'
            }
        }

        stage ('Build') {
            steps {
                sh 'yarn'
            }
        }

        stage ('test') {
            steps {
                sh 'yarn test:cov'
            }
        }

        stage('Analysis') {
            environment {
                scannerHome = tool 'sonar'
            }
            steps {
                withSonarQubeEnv('sonar') {
                sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-stock-management-api \
                    -Dsonar.projectName=devops-stock-management-api \
                    -Dsonar.projectVersion=1.0 \
                    -Dsonar.testExecutionReportPaths=coverage/test-reporter.xml'
                '''
                }
            }
        }

        stage('Quality Gate') {
          steps {
            timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
            }
          }
        }

        stage('Build Docker image') {
            steps {
                script {
                docker.build('devops-stock-management-api:latest', '-f Dockerfile .')
                }
            }
        }
    }
}
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

            script {
                if (fileExists('playwright-report/index.html')) {

                    bat '''
                        powershell -NoProfile -Command "Compress-Archive -Path 'playwright-report\\*' -DestinationPath 'playwright-report.zip' -Force"
                    '''

                    emailext(
                        to: 'aieee006@gmail.com',
                        subject: "Playwright Test Report - Build #${env.BUILD_NUMBER}",
                        body: """
                            Playwright Test Execution Completed.

                            Job Name: ${env.JOB_NAME}
                            Build Number: ${env.BUILD_NUMBER}
                            Build Status: ${currentBuild.currentResult}

                            Please find the Playwright HTML report attached.

                            Jenkins Build URL: ${env.BUILD_URL}
                        """,
                        attachmentsPattern: 'playwright-report.zip'
                    )

                } else {
                    echo 'Playwright HTML report was not generated.'
                }
            }
        }
    }
}

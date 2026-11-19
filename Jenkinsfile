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

                def status = currentBuild.currentResult

                def statusColor = status == 'SUCCESS'
                    ? '#166534' : '#991b1b'

                def statusBackground = status == 'SUCCESS'
                    ? '#edf8f1' : '#fef2f2'

                def statusMessage = status == 'SUCCESS'
                    ? 'Execution Successful'
                    : 'Execution Completed with Issues'

                def emailBody = """
                <html>
                <body style="font-family:Arial,sans-serif;
                             background-color:#f2f5f9;
                             padding:25px;">

                    <div style="max-width:650px;
                                margin:auto;
                                background:#ffffff;
                                padding:30px;
                                border-radius:8px;">

                        <h2 style="color:#172b4d;">
                            Playwright Test Execution Report
                        </h2>

                        <p>Hello Team,</p>

                        <p>
                            The automated Playwright test execution
                            has been completed. Please find the
                            execution summary below.
                        </p>

                        <div style="background:${statusBackground};
                                    color:${statusColor};
                                    padding:15px;
                                    border-radius:5px;
                                    margin:20px 0;">
                            <strong>${statusMessage}</strong>
                            <br/>
                            Build Status: ${status}
                        </div>

                        <table style="width:100%;
                                      border-collapse:collapse;">

                            <tr>
                                <td style="padding:10px;
                                           border-bottom:1px solid #ddd;">
                                    <strong>Job Name</strong>
                                </td>
                                <td>${env.JOB_NAME}</td>
                            </tr>

                            <tr>
                                <td style="padding:10px;
                                           border-bottom:1px solid #ddd;">
                                    <strong>Build Number</strong>
                                </td>
                                <td>#${env.BUILD_NUMBER}</td>
                            </tr>

                            <tr>
                                <td style="padding:10px;
                                           border-bottom:1px solid #ddd;">
                                    <strong>Build Status</strong>
                                </td>
                                <td>${status}</td>
                            </tr>

                            <tr>
                                <td style="padding:10px;
                                           border-bottom:1px solid #ddd;">
                                    <strong>Report</strong>
                                </td>
                                <td>playwright-report.zip</td>
                            </tr>

                        </table>

                        <p>
                            The detailed Playwright HTML report
                            is attached for your review.
                        </p>

                        <p>
                            <a href="${env.BUILD_URL}"
                               style="color:#2563eb;">
                                View Jenkins Build
                            </a>
                        </p>

                        <hr style="border:0;
                                   border-top:1px solid #ddd;
                                   margin-top:30px;"/>

                        <p>
                            Best regards,<br/>
                            <strong>QA Automation Team</strong><br/>
                            Automated Testing &amp; Quality Assurance
                        </p>

                        <p style="font-size:11px;
                                  color:#888;">
                            This is an automated notification
                            generated by Jenkins.
                        </p>

                    </div>
                </body>
                </html>
                """

                emailext(
                    to: 'aieee006@gmail.com',
                    subject: "Playwright Automation Report | ${env.JOB_NAME} | Build #${env.BUILD_NUMBER} | ${status}",
                    mimeType: 'text/html',
                    body: emailBody,
                    attachmentsPattern: 'playwright-report.zip'
                )

            } else {
                echo 'Playwright HTML report was not generated.'
            }
        }
    }
}

}

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/albatusi/https://github.com/albatusi/sample_app-cypres',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build App') {
            steps {
                script {
                    sh 'docker build -t sample-app .'
                }
            }
        }

        stage('Run Tests with Cypress') {
            steps {
                script {
                    // Montamos el workspace y ejecutamos Cypress en el contenedor
                    sh 'docker run --rm -v $WORKSPACE:/e2e sample-app npm run cy:run'
                }
            }
        }
    }

    post {
        always {
            echo "Publicando reportes..."
            publishHTML (target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'Cypress Test Report'
            ])
        }
    }
}

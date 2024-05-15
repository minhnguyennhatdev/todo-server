pipeline {
    agent any

    environment {
        REMOTE_NAME = 'ubuntu'
        REMOTE_ALLOW_ANY_HOSTS = true
        REPOSITORY_PATH = '/var/www/myhr/todo-server'
    }

    stages {
      stage('Deploy') {
        steps {
          script {
            def remote = [:]
            remote.name = env.REMOTE_NAME
            remote.allowAnyHosts = env.REMOTE_ALLOW_ANY_HOSTS

            withCredentials([
              sshUserPrivateKey(
                  credentialsId: 'OVH_CREDENTIALS',
                  keyFileVariable: 'identity',
                  passphraseVariable: '',
                  usernameVariable: 'userName'
              ),
              string(credentialsId: 'OVH_HOST', variable: 'ovhHost')
            ]) {
              remote.host = ovhHost
              remote.user = userName
              remote.identityFile = identity

              sshCommand remote: remote, command: "cd ${REPOSITORY_PATH} && ./deploy.sh"
            }
          }
        }
      }
    }
}

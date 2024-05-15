def remote = [:]
remote.name = 'ubuntu'
remote.allowAnyHosts = true

node {
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

    environment {
      REPOSITORY_PATH = '/var/www/myhr/todo-server'
    }

    stage('DEPLOY') {
      sshCommand remote: remote, command: "cd ${REPOSITORY_PATH} && ./deploy.sh"
    }
  }
}

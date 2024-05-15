def remote = [:]
remote.name = 'ubuntu'
remote.host = credentials('OVH_HOST')
remote.allowAnyHosts = true

node {
    withCredentials([
      sshUserPrivateKey(
        credentialsId: 'OVH_CREDENTIALS',
        keyFileVariable: 'identity',
        passphraseVariable: '',
        usernameVariable: 'userName'
      )
    ]) {
      remote.user = userName
      remote.identityFile = identity
      stage('DEPLOY') {
        sshCommand remote: remote, command: 'cd /var/www/myhr/todo-server && ./deploy.sh'
      }
    }
}

def remote = [:]
remote.name = 'ubuntu'
remote.host = '15.235.163.83'
remote.allowAnyHosts = true

node {
    withCredentials([
      sshUserPrivateKey(
        credentialsId: 'OVH',
        keyFileVariable: 'identity',
        passphraseVariable: '',
        usernameVariable: 'ubuntu'
      )
    ]) {
      remote.user = userName
      remote.identityFile = identity
      stage('DEPLOY') {
        sshCommand remote: remote, command: 'cd /var/www/myhr/todo-server && ./deploy.sh'
      }
    }
}


// git clone https://anthony-egwu@bitbucket.org/anthony-egwu/bizzdesk-customer-support-portal.git

job("reack-docker-build-and-publish"){
    scm{
        git('git://github.com/bluechiptony/bz-customer-support-portal.git' ){
            node / gitConfigName("Anthony Egwu")
            node / gitConfigEmail("tony5egwu@gmail.com")
        }

    }
    triggers{
        scm('H/5 * * * *')
    }

    wrappers{
        nodejs('nodejs')
    }

    steps{
        dockerBuildAndPublish{
            repositoryName('bluechiptony/bizzdesk-customer-support-portal')
            // tag('${GIT_REVISION,length=9}')
            registryCredentials('a5e7e2a9-7efb-4d4c-b9f3-174b7bf8c486')
            forcePull(false)
            forceTag(false)
            createFingerprints(false)
            skipDecorate()

         
        }
    }

}
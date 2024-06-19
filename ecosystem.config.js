

// module.exports = {
//     apps: [
//         {
//             name: "ancat",
//             script: {
//                 "server": "babel-node src/index.js"
//             },
//             watch: true,
//             // env: {
//             //     NODE_ENV: "development",
//             // },
//             // env_production: {
//             //     NODE_ENV: "production",
//             // },
//         },
//     ],
// };

module.exports = {
    apps: [{
        name: 'my-server',
        script: 'dist/index.js',
        // args: 'run server',
        exec_mode: 'fork',
        watch: false,
        ignore_watch: ['node_modules'],
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],
};



// module.exports = {
//     apps: [{
//         script: 'index.js',
//         watch: '.'
//     }, {
//         script: './service-worker/',
//         watch: ['./service-worker']
//     }],

//     deploy: {
//         production: {
//             user: 'SSH_USERNAME',
//             host: 'SSH_HOSTMACHINE',
//             ref: 'origin/master',
//             repo: 'GIT_REPOSITORY',
//             path: 'DESTINATION_PATH',
//             'pre-deploy-local': '',
//             'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
//             'pre-setup': ''
//         }
//     }
// };

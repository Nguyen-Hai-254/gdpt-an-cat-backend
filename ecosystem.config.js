

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
        name: 'my_server',
        script: './src/index.js',
        "log_date_format": "YYYY-MM-DD HH:mm Z",

        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        // args: 'one two',
        // instances: '1',
        autorestart: true,
        watch: true,
        exec_interpreter: "babel-node",
        exec_mode: "fork",
        max_restarts: 10,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        // exec_mode: 'cluster'
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

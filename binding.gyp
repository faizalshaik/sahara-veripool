{
    "targets": [{
        "target_name": "sharaveripool",
        "cflags!": ["-w", "-fpermissive", "-fno-exceptions"],
        "cflags_cc!": ["-fno-exceptions", "-fpermissive"],
        "sources": [
            "./src/libraries/sharaveripool/log.cc",
            "./src/libraries/sharaveripool/node.cc",
            "./src/libraries/sharaveripool/global.cc",
            "./src/libraries/sharaveripool/utils.cc",
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")",
            "./src/libraries/sharaveripool/",
            "<!(pwd)/src/libraries/verilator/src/"
        ],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")",
        ],
        'defines': [],
        'conditions': [
            ['OS=="linux"', {                
                'link_settings': {
                    'ldflags': [
                        '-static-libgcc',
                        '-static-libstdc++',
                        '-Xlinker',
                        '-gc-sections',
                        '-lpthread',
                        '-llog4cplus',
                        ],
                    'libraries': ['<!(pwd)/src/libraries/verilator/bin/verilator_bin.a']
                },
            }],
            ['OS=="mac"', {
                'xcode_settings': {
                    'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                },
                'link_settings': {
                    'libraries': ['<!(pwd)/src/libraries/verilator/bin/verilator_bin.a']
                },
            }]
        ]
    }]
}

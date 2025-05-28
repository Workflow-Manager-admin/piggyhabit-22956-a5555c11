#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-22956-a5555c11/piggyhabit_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


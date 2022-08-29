#！/bin/bash

unset http_proxy  &&
unset https_proxy  &&
git add . &&
git commit -m "$1" &&
git pull  &&
git push -u origin main &&
echo "hello this is github flow================then gitlab, please" &&
git push -u gitlab-codelearning main
source projectName.conf || { echo "command failed"; exit 1; }

# // 删除旧release文件夹
rm -fr ./git_html
rm -fr ./git_static

# // 初始化git
git clone http://githome/fe/html.git git_html || { echo "command failed"; exit 1; }
cd ./git_html || { echo "command failed"; exit 1; }
git fetch
# 从test创建新分支
git checkout -b test origin/test || { echo "command failed"; exit 1; }
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f -name '*.html' | tr '\n' ' ') ../git_html/manual/$PRONAME  --parents || { echo "command failed"; exit 1; }

# push代码到remote
cd ../git_html || { echo "command failed"; exit 1; }
git add .
git commit -m 'auto upload By shell.'
git push

# 回到根目录
cd .. || { echo "command failed"; exit 1; }
# // 初始化git
git clone http://githome/fe/static.git git_static || { echo "command failed"; exit 1; }
cd ./git_static || { echo "command failed"; exit 1; }
git fetch
# 从test创建新分支
git checkout -b test origin/test || { echo "command failed"; exit 1; }
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f ! -name '*.html' | tr '\n' ' ') ../git_static/manual/$PRONAME  --parents || { echo "command failed"; exit 1; }

# push代码到remote
cd ../git_static || { echo "command failed"; exit 1; }
git add .
git commit -m 'auto upload By shell.'
git push

printf "%-s\t %-s\t\n" No url
printf "%-s\t %-s\t\n" 1 http://oms.test.gyapt.cn/fe/$PRONAME
printf "%-s\t %-s\t\n" 2 http://omstest.longfor.com/fe/$PRONAME
printf "%-s\t %-s\t\n" 2 http://m.iguanyu.com/fe/$PRONAME

echo "\033[46;30m 更新测试服务器静态资源需要30-60秒，请稍等 \033[0m" 

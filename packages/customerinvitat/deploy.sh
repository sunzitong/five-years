source projectName.conf

# // 删除旧release文件夹
rm -fr ./git_html
rm -fr ./git_static

# // 初始化git
git clone http://githome/fe/html.git git_html
cd ./git_html
git fetch
# 从test创建新分支
# git checkout -b test origin/test
git checkout -b f_$PRONAME
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f -name '*.html' | tr '\n' ' ') ../git_html/manual/$PRONAME  --parents

# push代码到remote
cd ../git_html
git add .
git commit -m 'production: auto upload By shell.'
git push -f --set-upstream origin f_$PRONAME

# 回到根目录
cd ..
# // 初始化git
git clone http://githome/fe/static.git git_static
cd ./git_static
git fetch
# 从test创建新分支
# git checkout -b test origin/test
git checkout -b f_$PRONAME
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f ! -name '*.html' | tr '\n' ' ') ../git_static/manual/$PRONAME  --parents

# push代码到remote
cd ../git_static
git add .
git commit -m 'production: auto upload By shell.'
git push -f --set-upstream origin f_$PRONAME

echo "\033[46;30m 如需上线，请到gitlab继续提交MR到master分支 \033[0m" 
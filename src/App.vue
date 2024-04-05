<template>
  
 <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app,html,body {
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
 ::-webkit-scrollbar
{
    width:10px;
    height:10px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(138, 220, 245, 0.3);
    border-radius:5px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:5px;
    -webkit-box-shadow:inset 0 0 6px rgba(132, 206, 248, 0.3);
    background-color:#c4ced6;
}

</style>

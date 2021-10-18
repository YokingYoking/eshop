<template>
    <el-container>
        <el-header>
            <el-menu :default-active="defaultActiveIndex"
                     mode="horizontal"
                     class="navBar"
                     router>
                <el-menu-item index="hot" >List</el-menu-item>
				<el-menu-item index="search">Search</el-menu-item>
                <el-submenu  index="user">
                    <template slot="title">User</template>    
                    <el-menu-item @click="onCart" index="cart">My Cart</el-menu-item>
					<el-menu-item @click="onLogout" index="logout">Logout</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-main>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
    import {getStream} from "~/api/products";
    export default {
        data(){
            return {
                defaultActiveIndex: 'hot',
            }
        },
        methods: {
            onLogout() {
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('isNewUser')
                this.$router.push({path:'/login'})
            },
			onCart() {
				// console.log(this.$route)
				if(this.$route.name !== 'cart') {
					this.$router.push({path:'cart'})
				}
			},
        },
        created() {
        }
    }
</script>

<style scoped>
    .navBar{
        display: flex;
        justify-content: space-between;
    }
</style>
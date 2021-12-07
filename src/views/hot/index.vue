<template>
    <el-container class="container">
        <el-main class="mainContainer">
            <product-list :list-data="listData" :isCart="false"></product-list>
        </el-main>
    </el-container>
</template>

<script>
    import {getHot} from "~/api/products";
    export default {
        name: "hot",
        components: {
            productList: () => import('../../components/productList')
        },
        data() {
          return {
              listData: []
          }
        },
		methods: {
		},
        created() {
            getHot(100, sessionStorage.getItem('username')).then((res) => {
                if(res.status === 200 && res.data.success) {
					// res.data.products.forEach((item, index, arr) => {
					// 	let _score = item.score
					// 	let str = _score.toFixed(1)
					// 	let res = parseFloat(str)
					// 	item.score = res
					// })
					// console.log(res.data.products)
					this.listData = res.data.products
                }
            })
        }
    }
</script>

<style scoped>
    html,body{
        width: 100%;
        height: 100%;
    }
    .container{
        width: 100%;
        height: 100%;
    }
    .mainContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
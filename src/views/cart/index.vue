<template>
	<el-container class="container">
		<el-main class="mainContainer">
		    <product-list :list-data="listData" :isCart="true" @refresh='getdata' v-if='listData.length !== 0'></product-list>
			<div v-else>
				<h4>Nothing in the cart!</h4>
				<el-button type="primary" class="toShop" @click='toShop'>Go to Shop</el-button>
			</div>
			<el-button type="primary" @click='pay' v-if='listData.length !== 0' class="pay">Pay Now</el-button>
		</el-main>
	</el-container>
</template>

<script>
	import {getCart} from '../../api/products.js'
	import {clearCart} from '../../api/products.js'
	export default {
		name: "cart",
		components: {
		    productList: () => import('../../components/productList')
		},
		data() {
			return {
				listData:[]
			}
		},
		methods: {
			getdata() {
				let that = this
				if(sessionStorage.getItem('username')) {
					getCart(sessionStorage.getItem('username')).then(res => {
						if(res.status === 200 && res.data.success) {
							that.listData = res.data.cartList
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(err => {
						
					})
				}
			},
			toShop() {
				this.$router.replace('/homepage') // go back to homepage
				// console.log(this.$route)
			},
			pay() {
				if(sessionStorage.getItem('username')) {
					clearCart(sessionStorage.getItem('username')).then(res => {
						if(res.status === 200 && res.data.success) {
							this.$message.success('Your order has been accepted')
							this.getdata()
						} else {
							this.$message.error('error')
						}
					})
				}
			}
		},
		created() {
			this.getdata()
		}
	}
</script>

<style scoped>
	.toShop {
		width: 100%;
	}
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
	.pay {
		width: 75%;
	}
</style>

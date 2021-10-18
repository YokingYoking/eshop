<template>
    <el-container class="container">
        <div v-for="item in listData" :key="item.index" class="item">
            <el-image
                    style="width: 100px; height: 100px;margin-right: 10px;"
                    :src="item.imageUrl"
                    fit="fill"></el-image>
            <div class="item_info">
                <el-link type="primary"
                         class="item_name"
                         :underline="false"
                         :href="'http://127.0.0.1:8010/#/homepage/detail?productId='+item.productId">{{item.name}}</el-link>
                <el-rate
                        v-model="item.score.toFixed(1)"
                        disabled
                        text-color="#ff9900"
                        show-score
						v-if="!isCart"
                >
                </el-rate>
				<h3 v-if="!isCart">${{item.price}}</h3>
            </div>
			<div class="cart" v-if="isCart">
				<el-input-number v-model="item.amount" :min="1" label="Amount" class="amount" @change='onChange(item.amount, item.productId)'></el-input-number>
				<el-button type="danger" icon="el-icon-delete" circle @click='onDelete(item.productId)'></el-button>
			</div>
        </div>
    </el-container>
</template>

<script>
	import{deleteCart} from '../../api/products.js'
	import {changeCart} from '../../api/products.js'
    export default {
        name: "index",
        props: {
            listData: {
                type: Array,
                required: true,
            },
			isCart: {
				type: Boolean
			}
        },
        data() {
            return {}
        },
		methods: {
			onDelete(productId) {
				// console.log(productId)
				this.$confirm('Are you sure to remove it from your cart?', 'Notification', {
				          confirmButtonText: 'Yes',
				          cancelButtonText: 'Cancel',
				          type: 'warning'
				        }).then(() => {
							if(sessionStorage.getItem('username') && productId) {
								deleteCart(sessionStorage.getItem('username'),productId).then(res => {
										if(res.status === 200 && res.data.success) {
											this.$message({
											  type: 'success',
											  message: 'Remove it successfully'
											})
											this.$emit('refresh')
										}
									}).catch((err) => {
								        
								})
							}
						})
					},
			onChange(amount, productId) {
				// console.log(amount,productId)
				if(sessionStorage.getItem('username')) {
					changeCart(sessionStorage.getItem('username'),productId, amount).then(res => {
						if(res.status === 200 && res.data.success) {
							this.$message({
							  type: 'success',
							  message: 'Change successfully'
							})
							// this.$emit('refresh')
						}
					})
				}
			}
		},
		
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
        display: flex;
        flex-direction: column;
    }
    .item {
        margin: 15px 0;
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
    }
    .item_info {
        display: flex;
        flex-direction: column;
    }
    .item_name {
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
    }
	.cart {
		width: 50%;
		height: 100%;
		margin-left: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}
	.amount {
		max-width: 50%;
	}
</style>
<template>
    <el-container class="container">
		<el-page-header @back="goBack" title="back" content="Detail" class='back'>
		</el-page-header>
        <el-image
                style="width: 200px; height: 200px;margin-right: 10px;align-self: center;margin-bottom: 30px;"
                :src="productDetail.imageUrl"
                fit="fill"
        ></el-image>
        <h2>{{productDetail.name}}</h2>
        <el-rate v-model="productDetail.score.toFixed(1)"
                 show-score
                 text-color="#ff9900"
                 allow-half
				 disabled
        @change="onRate"></el-rate>
		<h3>${{productDetail.price}}</h3>
        <h4>Category</h4>
        <div>{{productDetail.categories}}</div>
        <h4>Tags</h4>
        <div class="tags">
            <el-tag type="info"
                    v-for="tag in tagsArr"
                    :key="tag.index"
                    style="margin-right: 15px;">{{tag}}</el-tag>
        </div>
		<div class='cartBtn'>
			<el-input-number v-model="amount" :min="1" label="Amount"></el-input-number>
			<el-button type="primary" class="add2cart" @click='onAdd2Cart'>+ Add To Cart</el-button>
		</div>
		
    </el-container>
</template>

<script>
    import {getDetail} from "~/api/products";
    import {getItemcfRec} from "~/api/products";
    import {getContentRec} from "~/api/products";
    import {rate} from "~/api/products";
	import {add2Cart} from '~/api/products';
    export default {
        name: "detail",
        components: {
          productList: () => import('../../components/productList')
        },
        data() {
            return {
                productDetail: {},
                tagsArr: [],
                itemcfRec: [],
                contentRec: [],
				amount: 1,
            }
        },
        methods: {
          onRate(newScore) {
              // console.log(newScore)
              this.productDetail.score = newScore
              // rate(this.$route.query.productId,newScore.toFixed(1), sessionStorage.getItem('username')).then( res => {
              //     if(res.data.success) {
              //         this.$message.success(res.data.message)
              //     }
              // } ).catch( err => {
              //     this.$message.error(err)
              // })
          },
            loadData(){
                getDetail(this.$route.query.productId).then( res => {
                    if (res.status === 200) {
						// console.log(res.data.products)
                        this.productDetail = res.data.product
                        this.tagsArr = this.productDetail.tags.split('|')
                    }
                })
            },
			goBack() {
			  this.$router.go(-1)
			},
			onAdd2Cart() {
				let username = sessionStorage.getItem('username')
				let productId = this.$route.query.productId
				let amount = this.amount
				let that = this
				add2Cart(username, productId, amount).then(res => {
					if (res.status === 200 && res.data.success) {				
					    this.$message.success('Add To Cart Successfully')
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
        },
        watch: {
          '$route.query.productId': 'loadData'
        },
        created() {
            // console.log(this.$route.query.productId)
            this.loadData()
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .tags {
        display: flex;
        flex-direction: row;
    }
	.cartBtn {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		margin-top: 20px;
	}
	.add2cart {
		width: 50%;
		align-self: center;
	}
	.back {
		margin-bottom: 15px;
	}
</style>
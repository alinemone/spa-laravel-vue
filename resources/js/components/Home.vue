<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
<!--                @change="checkError"-->
                <form class="mt-2">
                    <div class="form-group text-right">
                        <label for="exampleFormControlInput1">عنوان</label>
                        <input type="text" class="form-control" :class="[errors.ti.length > 0 ? 'is-invalid' : '']"  id="exampleFormControlInput1" placeholder="عنوان" v-model="title" >
                        <div class="w-100 text-right">
                            <small class="text-danger" v-for="err in errors.ti">{{err}}</small>
                        </div>
                    </div>

                    <div class="form-group text-right">
                        <label for="exampleFormControlTextarea1">متن</label>
                        <textarea class="form-control " :class="[errors.by.length > 0 ? 'is-invalid' : '']" id="exampleFormControlTextarea1" rows="3" v-model="body"/>
                        <div class="w-100 text-right ">
                            <small class="text-danger" v-for="err in errors.by">{{err}}</small>
                        </div>
                    </div>


                    <button class="btn btn-success" @click.prevent="postEvent()">Save</button>
                </form>
            </div>
            <div class="col-md-6">
               <div v-if="loading" class="d-flex justify-content-center mt-3">
                   <div class="spinner-border text-primary" role="status">
                       <span class="sr-only">Loading...</span>
                   </div>
               </div>

                <div class="card mt-2" v-for="event in events.data">
                   <div class=" animate__animated animate__fadeInDown">
                       <div class="card-header bg-abi d-flex justify-content-between">
                           {{event.title}}
                           <button class="btn btn-sm btn-danger" @click.prevent="deleteEvent(event.id)">delete</button>
                       </div>
                       <div class="card-body text-right">
                           <p class="card-text">{{event.body}}</p>
                           <p class="card-text text-left d-flex justify-content-between"><small>{{event.id}} : ID</small><small class="text-muted">{{event.date}}</small></p>
                       </div>
                   </div>
                </div>

               <div class="mt-4" dir="ltr">
                   <pagination :data="events" :limit="1"  @pagination-change-page="getEvent"/>
               </div>


            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {
                loading:true,
                title: '',
                body: '',
                events: {},
                errors: {
                    ti: {},
                    by: [],
                },

            }
        },

        mounted(){
            this.getEvent()
        },
        methods:{

            async getEvent(page = 1){
                await axios.get('/api/v1/events?page=' + page)
                 .then((res)=>{
                       this.events = res.data;
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    .finally(() => (this.loading = false));

            },



            postEvent() {
                axios.post('/api/v1/events', {title: this.title, body: this.body},{'Accept': 'application/json'})
                    .then(res => {
                        this.title = '';
                        this.body = '';
                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-start',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'با موفقیت ذخیره شد!'
                        })
                        this.loading = true;
                        this.getEvent();
                        this.errors.ti = [];
                        this.errors.by = [];

                    })
                    .catch(err => {
                        if(err.response.status === 422) {
                            this.errors.ti = err.response.data.errors.title === undefined ? [] : err.response.data.errors.title;
                            this.errors.by = err.response.data.errors.body === undefined ? [] :err.response.data.errors.body;
                        }else {
                            console.log(err.data)
                        }
                    });
            },


            deleteEvent(id){
                this.$swal({
                    title: 'آیا مطمعن هستید؟',
                    text: "شما نمی توانید این را برگردانید!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#38c172',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '!Yes, delete it'
                }).then((result) => {
                    if (result.value) {
                        axios.delete('/api/v1/events/'+id).then((res)=>{
                            this.getEvent(this.events.meta.current_page);
                        }).catch((err)=>{
                            console.log(err)
                        });
                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-start',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'با موفقیت حذف شد!'
                        })
                    }
                })


            }





        }
    }
</script>

<style scoped>
.bg-abi{background-color: #23d3d3}
</style>

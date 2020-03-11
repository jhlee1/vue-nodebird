<template>
    <v-card>
        <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-textarea
                        v-model="content"
                        outlined
                        auto-grow
                        clearable
                        label="어떤 신기한 일이 있었나요?"
                        :hide-details="hideDetails"
                        :success-messages="successMessages"
                        :success="success"
                        :rules="[v => !!v || '내용을 입력하세요']"
                        @input="onChangeTextarea"
                />
                <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
                <v-btn>이미지 업로드</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>
<script>
    import { mapState } from 'vuex';

    // form들은 대부분 html 태그나 onSubmitForm 같이 비슷한 attribute들이 반복됨
    export default {
        data() {
            return {
                hideDetails: true,
                successMessages: '',
                success: false,
                content: ''
            }
        },
        computed: {
            ...mapState(['users/me']),
            // ...mapState(['users', ['me']) 이렇게 처리하기도 함
        },
        methods: {
            onChangeTextarea() {
                this.hideDetails = true;
                this,success = false;
                this.successMessages = '';

            },
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('posts/add', {
                        content: this.content,
                        User: {
                            nickname:  this.me.nickname
                        },
                        Comments: [],
                        Images: [],
                        id: Date.now(),
                        crearedAt: Date.now()
                    })
                    .then(() => {
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공';
                    })
                    .catch(() => {

                    });
                }
            }
        }
    }
</script>

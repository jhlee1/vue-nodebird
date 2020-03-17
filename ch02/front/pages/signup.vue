<template>
    <div>
        <v-container>
            <v-card>
                <v-container>
                    <v-subheader>회원가입</v-subheader>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field
                                v-model="email"
                                label="이메일"
                                type="email"
                                :rules="emailRules"
                                required
                        />
                        <v-text-field
                                v-model="password"
                                label="비밀번호"
                                type="password"
                                :rules="passwordRules"
                                required
                        />
                        <v-text-field
                                v-model="passwordCheck"
                                label="비밀번호 확인"
                                type="password"
                                :rules="passwordCheckRules"
                                required
                        />
                        <v-text-field
                                v-model="nickname"
                                label="닉네임"
                                type="nickname"
                                :rules="nicknameRules"
                                required
                        />
                        <v-checkbox
                                v-model="terms"
                                required
                                :rules="[ v => !!v || '약관에 동의해야 합니다.' ]"
                                label="제로초 말을 잘 들을 것을 약속합니다."
                        />
                        <v-btn color="green" type="submit">가입하기</v-btn>

                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: false, // 회원가입 버튼이 눌릴 수 있는지 검사, vuetify에서 자동으로 처리해줌
                email: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false,
                emailRules: [
                    v => !!v || '이메일은 필수입니다.',
                    v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
                ],
                nicknameRules: [
                    v => !!v || '닉네임은 필수입니다.'
                ],
                passwordRules: [
                    v => !!v || '비밀번호는 필수입니다.'
                ],
                passwordCheckRules: [
                    v => !!v || '비밀번호 확인은 필수입니다.',
                    v => v === this.password || '비밀번호가 일치하지 않습니다.'
                ]
            }
        },
        head() {
            return {
                title: '회원가입'
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            }
        },
        watch: {
            me(value, oldValue) {
                if (value) {
                    this.$router.push({
                        path: '/',
                    });
                }
            }
        },
        methods: {
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('users/signUp',
                        {
                            nickname: this.nickname,
                            email: this.email

                        }
                    ).then(() => { // 각 문장이 비동기적으로 실행되기 때문에 dispatch가 return하는 premise에 then을 붙여서 실행되도록한
                        // premise 대신 async await을 쓸 수도 있음
                        this.$router.push({
                            path: '/',
                        });
                    }).catch(() => {
                        alert('회원가입 실패');다
                    });
                } else {
                    alert('폼이 유효하지 않습니다.');
                }
                console.log(this.valid);
            }
        },
        middleware: 'anonymous' //TODO: 공식문서 ROUTING 부분에 middleware 읽어보기
    }
</script>

<template>
    <div>
        <v-container>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>내 프로필</v-subheader>
                    <v-form v-model="valid" @submit.prevent="onChangeNickname">
                        <v-text-field
                            v-model="nickname"
                                label="닉네임"
                            :rules="nicknameRules"
                            required
                        />
                        <v-btn color="blue" type="submit">수정</v-btn>
                    </v-form>
                </v-container>
                <v-container>
                    <v-form>
                        <v-text-field
                                label="닉네임"
                                required
                        />
                        <v-btn color="blue" type="submit">수정</v-btn>
                    </v-form>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로잉</v-subheader>
                    <follow-list :users="followingList" :remove="removeFollowing" />
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <follow-list :users="followerList" :remove="removeFollower" />
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import FollowList from '~/components/FollowList';
    export default {
        // layout: 'admin', //layout을 설정할 옵션을 고를 수 있음

        components: {
            FollowList
        },
        data() {
            return {
                name: 'nuxt.js',
                valid: false,
                nickname: '',
                nicknameRules: [
                    v => !!v || '닉네임을 입력해주세요',
                ]
            }
        },
        computed: {
            followerList() {
                return this.$store.state.users.followerList;
            },
            followingList() {
                return this.$store.state.users.followingList;
            }
        },
        methods: {
            onChangeNickname() {
                this.$store.dispatch('users/changeNickname', {
                    nickname: this.nickname
                })
            },
            removeFollowing(id) {
                this.$store.dispatch('users/removeFollowing', {
                    id
                });
            },
            removeFollower(id) {
                this.$store.dispatch('users/removeFollower', {
                    id
                });
            }
        },
        head() {
            return {
                title: '프로필'
            }
        }
    }
</script>

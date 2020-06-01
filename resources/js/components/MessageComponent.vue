<template>
    <div class="p-2">
        <li :class="className" style="width:100%; word-wrap:break-word" class="d-flex flex-column">
            <slot></slot>
            <small class="text-muted">{{ time }}</small>
        </li>
        <small :class="badgeClass">{{ users }}</small>
    </div>

</template>

<script>
    export default {
        props:[
            'color',
            'users',
            'time',
        ],
        computed: {
            className() {
                return 'list-group-item bg-'+this.color;
            },
            badgeClass() {
                return 'badge float-right badge-'+this.color;
            }  
        },
    }
</script>

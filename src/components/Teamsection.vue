<template>
    <div class="team-card">
                <div class="card">
                    <div class="image-section">
                        <img src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="">
                    </div>
                    <div class="content">
                        <h4>FirstName LastName</h4>
                        <p>Department</p>
                        <p>Title</p>
                        <p>Location</p>
                    </div>
                </div>
                <div class="card hide">
                    <div class="image-section">
                        <img src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="">
                    </div>
                    <div class="content">
                        <h4>FirstName LastName</h4>
                        <p>Department</p>
                        <p>Title</p>
                        <p>Location</p>
                    </div>
                </div>
                <div class="card hide">
                    <div class="image-section">
                        <img src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="">
                    </div>
                    <div class="content">
                        <h4>FirstName LastName</h4>
                        <p>Department</p>
                        <p>Title</p>
                        <p>Location</p>
                    </div>
                </div>
                <div class="card hide">
                    <div class="image-section">
                        <img src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="">
                    </div>
                    <div class="content">
                        <h4>FirstName LastName</h4>
                        <p>Department</p>
                        <p>Title</p>
                        <p>Location</p>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

.team-card{
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 32.9px;
}
.team-card .card{
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    cursor: pointer;
}
.team-card .card:hover{
    background-color: #f3f3f3;
    transition: 0.3s;
}
/* .team-card .card .image-section{
    height: 100px;
    width: 100px;
} */
.team-card .card img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 3px solid #fff;
}
.team-card .card .content{
    width: 100%;
    text-align: center;
    margin-top: 16px;
}
.team-card .card .content h4{
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.41;
    letter-spacing: normal;
    margin-block: auto;
    color: #314566;
}
.team-card .card .content p{
    font-family: 'Raleway', sans-serif;
    font-weight: normal;
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.41;
    letter-spacing: normal;
    margin-block: auto;
    color: #181616;
}

@media screen and (max-width: 768px){
    .team-card{
        grid-template-columns: 1fr;
    }
    .team-card .card{
        width: 60%;
    }
    .team-card .hide{
        display: none;
    }
}
</style>
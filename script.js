document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts");

    // جلب المنشورات من LocalStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    // عرض المنشورات
    const renderPosts = () => {
        postsContainer.innerHTML = ""; // مسح المنشورات الحالية
        posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                ${post.media ? `<img src="${post.media}" alt="وسائط المنشور" style="max-width: 100%; max-height: 300px;">` : ""}
            `;
            postsContainer.appendChild(postDiv);
        });
    };

    renderPosts(); // عرض المنشورات عند تحميل الصفحة
});
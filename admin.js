document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("postForm");
    const postList = document.getElementById("postList");

    // قائمة المنشورات
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    // عرض المنشورات
    const renderPosts = () => {
        postList.innerHTML = ""; // مسح المحتوى الحالي
        posts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.media ? `<img src="${post.media}" alt="وسائط المنشور" style="max-width: 100%; max-height: 300px;">` : ""}
                <button onclick="deletePost(${index})">حذف</button>
            `;
            postList.appendChild(postDiv);
        });
    };

    // حذف منشور
    window.deletePost = (index) => {
        posts.splice(index, 1); // إزالة المنشور من القائمة
        localStorage.setItem("posts", JSON.stringify(posts)); // تحديث LocalStorage
        renderPosts(); // إعادة عرض المنشورات
    };

    // إضافة منشور جديد
    postForm.addEventListener("submit", (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const mediaInput = document.getElementById("media");
        let mediaURL = "";

        // التعامل مع رفع الوسائط
        if (mediaInput.files.length > 0) {
            const file = mediaInput.files[0];
            mediaURL = URL.createObjectURL(file);
        }

        posts.push({ title, content, media: mediaURL }); // إضافة المنشور إلى القائمة
        localStorage.setItem("posts", JSON.stringify(posts)); // تحديث LocalStorage
        renderPosts(); // إعادة عرض المنشورات

        postForm.reset(); // إعادة تعيين الحقول
    });

    renderPosts(); // عرض المنشورات عند التحميل
});
import User from "../models/user.model.js";

export const getUserProfileAndRepos = async (req, res) => {
  try {
    const { username } = req.params; //^ because in the route url we use /:username
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const userProfile = await userRes.json();

    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();

    return res.status(200).json({
      userProfile,
      repos,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params; //^ username of the user whose profile we are about to like
    const user = await User.findById(req.user._id.toString()); //^ user who has logged in
    console.log(user, "authenticated user");
    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res
        .status(404)
        .json({ error: "User is not a member of Devs On Github" });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(404).json({ error: "User is already liked" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });

    user.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), user.save()]);

    return res.status(200).json({ message: "User liked!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());

    return res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

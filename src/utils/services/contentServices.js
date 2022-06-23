import {
  videosRef,
  categoriesRef,
  contentsRef,
  albumsRef,
  mediaRef,
  doc,
  setDoc,
} from '../firebase/firebaseAuth';
import { AppLog } from './appLog';

const getVideosByCategory = (category) => {
  return videosRef.where('Category', 'array-contains', category).get();
};

const getMyContent = async (uid) => {
  return contentsRef.doc(uid).get();
};
const getCategories = async () => {
  let categories = [];
  categoriesRef.onSnapshot((query) => {
    query.docs.map((doc) => {
      const { Category_Name } = doc.data();
      return categories.push(Category_Name);
    });
  });

  // AppLog(categories, 'categories are ');
  return categories;
};

const createAlbum = async (docID, uid, albumName, albumPosterURL) => {
  await setDoc(doc(albumsRef, docID), {
    uid: uid,
    albumName: albumName,
    albumPosterURL: albumPosterURL,
    createdAt: new Date().toISOString(),
  }).then(() => {
    AppLog('create album successfully!');
  });
};

const uploadMedia = async (
  albumID,
  name,
  description,
  mediaType,
  contentType,
  source,
  sourceURL,
  posterURL,
  uploaderID,
  uploadSource
) => {
  await mediaRef
    .add({
      albumID: albumID,
      name: name,
      description: description,
      mediaType: mediaType,
      contentType: contentType,
      source: source,
      sourceURL: sourceURL,
      posterURL: posterURL,
      uploaderID: uploaderID,
      createdAt: new Date().toISOString(),
      uploadSource: uploadSource,
    })
    .then(() => {
      AppLog('create media successfully!');
    });
};

const getMyAlbums = async (uid) => {
  return albumsRef.where('uid', '==', uid).orderBy('createdAt').get();
};

const getMediaByAlbumID = async (albumID) => {
  return mediaRef.where('albumID', '==', albumID).orderBy('description').get();
};

export {
  getVideosByCategory,
  getCategories,
  getMyContent,
  createAlbum,
  uploadMedia,
  getMyAlbums,
  getMediaByAlbumID,
};

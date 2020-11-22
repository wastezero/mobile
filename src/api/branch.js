import {SERVER_URL} from './url';

const BranchUrl = '/client/branches';

export const GetBranches = async () => {
  try {
    const response = await fetch(SERVER_URL + BranchUrl);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const GetBranch = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}${BranchUrl}/${id}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
